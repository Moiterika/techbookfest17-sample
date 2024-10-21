/**
 * diffJsonは基準となるoriginalとcomparisonを比較して、差分をObject形式で返す関数
 *
 * @param {Record<string, any>} original
 * @param {Record<string, any>} comparison
 * @return {Record<string, any>}
 */
export const diffJson = (
    original: Record<string, any>,
    comparison: Record<string, any>
): Record<string, any> => {
    let result: Record<string, any> = {};

    for (let key in original) {
        if (!comparison.hasOwnProperty(key)) {
            result[key] = null; // 項目がなくなっていたらnull扱い
        } else if (
            typeof original[key] === "object" &&
            typeof comparison[key] === "object"
        ) {
            const value = diffJson(original[key], comparison[key]);
            if (Object.keys(value).length > 0) {
                result[key] = value;
            }
        } else if (original[key] !== comparison[key]) {
            result[key] = comparison[key]; // obj2の値を使用
        }
    }

    for (let key in comparison) {
        if (!original.hasOwnProperty(key)) {
            result[key] = comparison[key]; // obj2の値を使用
        }
    }

    return result;
};
