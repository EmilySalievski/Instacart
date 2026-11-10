import os
import signal
import subprocess
import sys
from pathlib import Path

from django.conf import settings
from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Run Django and the React dev server together"

    def add_arguments(self, parser):
        parser.add_argument("--frontend-dir", default="..")
        parser.add_argument("--addrport", default="8000")

    def handle(self, *args, **opts):
        react = None

        # The autoreloader re-runs this command in a child with RUN_MAIN=true;
        # only the parent should start the frontend.
        if os.environ.get("RUN_MAIN") != "true":
            frontend = (Path(settings.BASE_DIR) / opts["frontend_dir"]).resolve()
            if not frontend.is_dir():
                raise CommandError(f"Frontend dir not found: {frontend}")
            npm = "npm.cmd" if sys.platform == "win32" else "npm"
            react = subprocess.Popen([npm, "run", "dev"], cwd=frontend)

            def shutdown(*_):
                react.terminate()
                sys.exit(0)

            signal.signal(signal.SIGINT, shutdown)
            signal.signal(signal.SIGTERM, shutdown)

        try:
            call_command("runserver", opts["addrport"])
        finally:
            if react and react.poll() is None:
                react.terminate()
                try:
                    react.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    react.kill()