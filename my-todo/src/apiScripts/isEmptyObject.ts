/**
 * isEmptyObject はobjが空オブジェクト{}の場合、trueを返す関数
 *
 * @param {object} obj
 * @return {*}  {boolean}
 */
export const isEmptyObject = (obj: object): boolean => {
    return Object.keys(obj).length === 0;
};
