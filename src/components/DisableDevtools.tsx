"use client";

import { useEffect } from "react";
import DisableDevtool from "disable-devtool";

export default function DisableDevtoolInit() {
    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            DisableDevtool({
                clearLog: true,
                disableMenu: true,
                disablePaste: true,
                disableIframeParents: true,
                ondevtoolopen() {
                    window.location.href = "about:blank";
                },
            });
        }
    }, []);

    return null;
}
