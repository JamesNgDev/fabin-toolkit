export const getMutualFriend = (text: string) => {
    return Number((text || '').split(' ')?.[0] || 0);
};
