export const getEmojiActive = (studyId, emojiType) => {
  return (
    localStorage.getItem(`emoji-active:${studyId}:${emojiType}`) === 'true'
  );
};

export const setEmojiActive = (studyId, emojiType, value) => {
  localStorage.setItem(`emoji-active:${studyId}:${emojiType}`, String(value));
};
