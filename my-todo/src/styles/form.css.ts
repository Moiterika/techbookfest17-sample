import { css } from "../../styled-system/css";

export const inputStyle = css({
    border: "1px solid #818cf8",
    padding: "8px",
    borderRadius: "4px",
    _focus: {
        borderColor: "#4338ca",
        outline: "none",
    },
});

export const buttonStyle = css({
    padding: "8px 16px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "indigo.500",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",

    "&:hover": {
        backgroundColor: "indigo.700",
    },
    "&:active": {
        backgroundColor: "indigo.500",
    },
    "&:disabled": {
        backgroundColor: "indigo.100",
        cursor: "not-allowed",
        pointerEvents: "none",
    },
});
export const buttonErrorStyle = css({
    padding: "8px 16px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rose.500",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",

    "&:hover": {
        backgroundColor: "rose.700",
    },
    "&:active": {
        backgroundColor: "rose.500",
    },
    "&:disabled": {
        backgroundColor: "rose.100",
        cursor: "not-allowed",
        pointerEvents: "none",
    },
});
