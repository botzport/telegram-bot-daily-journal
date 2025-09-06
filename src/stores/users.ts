export const STATES = {
  AWAITING_GOALS: "awaiting_goals",
  AWAITING_REFLECTION: "awaiting_reflection",
  REFLECTION_RECEIVED: "reflection_received",
};

// NOTE: this simulates database of users
export const getUsers = (env) => [
  { chatId: env.TEST_CHAT_ID, timezone: "America/New_York", state: STATES.AWAITING_GOALS },
];

export const incrementState = ({ users, chatId }) => {
  const nextStateMap = {
    [STATES.AWAITING_GOALS]: STATES.AWAITING_REFLECTION,
    [STATES.AWAITING_REFLECTION]: STATES.REFLECTION_RECEIVED,
    [STATES.REFLECTION_RECEIVED]: STATES.REFLECTION_RECEIVED,
  };

  const user = users.find((u) => u.chatId == chatId);
  const currState = user.state;
  if (user) {
    user.state = nextStateMap[currState];
  }
};
