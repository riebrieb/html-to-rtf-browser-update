const PIXEL_IN_TWIP = 15;
const CM_IN_TWIP = 567;

const INDENT_RTF_REFERENCE =
    {   "text-indent"       : "\\fi"
        , "margin-left"     : "\\li"
        , "margin-right"    : "\\ri"
        , "padding-left"    : "\\li"
        , "padding-right"   : "\\ri"
    };


class Indentation {
    static getRtfReference(value, command) {
        console.log(value, command)
        if (!value || !INDENT_RTF_REFERENCE[command]) {
            return "";
        }

        if (typeof value !== "string") {
            return "";
        }

        value = value.toLowerCase();

        const rtfReference = INDENT_RTF_REFERENCE[command];

        const multiplier = this.getMultiplier(value);
        console.log(multiplier)
        if (multiplier === undefined) {
            return "";
        }

        return this.getReference(value, multiplier, rtfReference);
    }

    static getMultiplier(value) {
        if (value.includes("px")) {
            return PIXEL_IN_TWIP;
        }

        if (value.includes("cm")) {
            return CM_IN_TWIP;
        }

        return undefined;
    }

    static getReference(value, multiplier, rtfReference) {
        return (
            rtfReference +
            Math.trunc(parseFloat(value) * multiplier)
        );
    }
}

module.exports = Indentation;
