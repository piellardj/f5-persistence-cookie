import { EncodeContents } from "./decode-contents";
import { DecodeContents } from "./encode-contents";

enum EMode {
    NONE,
    DECODE,
    ENCODE,
}

function initialize(): void {
    const decodeModeInput = document.getElementById("mode-0") as HTMLInputElement;
    const encodeModeInput = document.getElementById("mode-1") as HTMLInputElement;

    const decodeContents = new DecodeContents();
    const encodeContents = new EncodeContents();

    let mode = EMode.NONE;

    function updateVisibility(): void {
        const newMode = decodeModeInput.checked ? EMode.DECODE : EMode.ENCODE;

        decodeContents.visibility = (newMode === EMode.DECODE);
        encodeContents.visibility = (newMode === EMode.ENCODE);

        if (mode === EMode.DECODE && newMode === EMode.ENCODE) {
            const cookieValue = decodeContents.getEncoded();
            if (cookieValue) {
                encodeContents.cookieValue = cookieValue;
            }
        } else if (mode === EMode.ENCODE && newMode === EMode.DECODE) {
            const cookiesInfo = encodeContents.getCookieInfos();
            if (cookiesInfo) {
                decodeContents.cookiesInfo = cookiesInfo;
            }
        }

        mode = newMode;
    }
    decodeModeInput.addEventListener("change", updateVisibility);
    encodeModeInput.addEventListener("change", updateVisibility);
    updateVisibility();
}

window.addEventListener("load", initialize);
