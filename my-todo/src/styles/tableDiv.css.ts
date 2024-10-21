import { css } from "../../styled-system/css";

export const table = css({
    width: "100%",
    borderCollapse: "collapse", // セルのボーダーを一つにまとめる
});

export const tableHeader = css({
    backgroundColor: "#f2f2f2",
    borderBottom: "2px solid #ddd", // ヘッダーの下に太めのボーダーを追加
});

export const tableBody = css({
    borderTop: "1px solid #ddd", // ボディの上部に線を引く
});

export const tableRow = css({
    borderBottom: "1px solid #ddd", // 各行の下に線を引く
});

export const tableCell = css({
    padding: "8px",
    borderBottom: "1px solid #ddd", // 各セルに線を引く
    textAlign: "left",
    verticalAlign: "middle",
});

export const tableHeaderCell = css({
    padding: "8px",
    textAlign: "left",
    verticalAlign: "middle",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd", // ヘッダーセルの下に太めの線
});
