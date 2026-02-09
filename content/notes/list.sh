#!/bin/bash
echo "=== Notes content directory ==="
ls -la /home/clawadmin/yuhi-site/content/notes/ 2>/dev/null || echo "No notes directory"

echo "=== All content directories ==="
ls -la /home/clawadmin/yuhi-site/content/ 2>/dev/null