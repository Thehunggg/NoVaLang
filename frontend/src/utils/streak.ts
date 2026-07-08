export const todayKey = () => new Date().toISOString().slice(0, 10);

export const updateStreak = (lastActiveDate: string | null, currentStreak: number) => {
  const today = todayKey();
  if (lastActiveDate === today) return { lastActiveDate: today, streak: currentStreak };
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return { lastActiveDate: today, streak: lastActiveDate === yesterday.toISOString().slice(0, 10) ? currentStreak + 1 : 1 };
};
