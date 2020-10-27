const TEXT_INDENT_RTF_REFERENCE = "\\fi";
const PIXEL_IN_TWIP = 15;
const CM_IN_TWIP = 567;

class TextIndent {
    static getRtfReference(value) {
        if (!value) {
            return "";
        }

        if (typeof value !== "string") {
            return "";
        }

        value = value.toLowerCase();

        if (value.includes("px")) {
            return this.getReferenceInPx(value);
        }

        if (value.includes("cm")) {
            return this.getReferenceInCm(value);
        }

        return "";
    }

    static getReferenceInPx(valueInPixel) {
        return (
            TEXT_INDENT_RTF_REFERENCE +
            Math.trunc(parseFloat(valueInPixel) * PIXEL_IN_TWIP)
        );
    }

    static getReferenceInCm(valueInPoints) {
        return (
            TEXT_INDENT_RTF_REFERENCE + Math.trunc(parseFloat(valueInPoints) * CM_IN_TWIP)
        );
    }
}

module.exports = TextIndent;
