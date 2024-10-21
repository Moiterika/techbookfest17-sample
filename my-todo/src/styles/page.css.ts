import { css } from "../../styled-system/css";

export const containerStyle = css({
    maxWidth: "1024px", // コンテナの最大幅を設定
    margin: "0 auto", // コンテナを中央に配置
    padding: "1rem", // コンテナ内の余白を設定
    border: "1px solid #ccc", // 必要に応じて境界線を追加
    borderRadius: "8px", // 角を丸くする
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 軽い影を追加して浮き上がったような効果
});
