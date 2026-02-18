export const cardThemes = {
  orange: {
    backgroundColor: '#FFE4C2',
    color: '#FF6D00',
  },
  green: {
    backgroundColor: '#B4FDD1',
    color: '#06B16E',
  },
  purple: {
    backgroundColor: '#E9D4FF',
    color: '#9A48F1',
  },
  gray: {
    backgroundColor: '#94A6BE',
    color: '#FFFFFF',
  },
}

export const getCardTheme = (topic) => {
  const themeMap = {
    'Web Design': 'orange',
    Research: 'green',
    Copywriting: 'purple',
  }
  return cardThemes[themeMap[topic]] || cardThemes.orange
}
