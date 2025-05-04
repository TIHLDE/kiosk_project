#!/bin/bash

URL="https://kiosken.tihlde.org"
BROWSER_PROCESS="chromium-browser"
CHROMIUM_CMD="/usr/bin/chromium-browser --start-fullscreen $URL &"

was_down=false

# Function to restart Chromium
refresh_browser() {
    echo "Refreshing browser after recovery..."
    pkill -f "$BROWSER_PROCESS"
    sleep 2
    eval "$CHROMIUM_CMD"
}

# Main loop
while true; do
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$URL")

    if [[ "$HTTP_STATUS" == "502" || "$HTTP_STATUS" == "504" || "$HTTP_STATUS" == "" ]]; then
        echo "$(date) - Site appears down (status: $HTTP_STATUS)"
        was_down=true
    elif [[ "$HTTP_STATUS" == "200" ]]; then
        if $was_down; then
            echo "$(date) - Site recovered (status: 200)"
            refresh_browser
            was_down=false
        else
            echo "$(date) - Site OK, no action needed."
        fi
    else
        echo "$(date) - Unexpected status: $HTTP_STATUS"
    fi

    sleep 45
done
