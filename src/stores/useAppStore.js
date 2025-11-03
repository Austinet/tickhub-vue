import { reactive, computed } from "vue";

export function useAppStore() {
  const state = reactive({
    usersDB: JSON.parse(localStorage.getItem("tickHubUsers") || "[]"),
    ticketsDB: JSON.parse(localStorage.getItem("tickHubTickets") || "[]"),
    ticketappSession: JSON.parse(
      localStorage.getItem("ticketapp_session") || "{}"
    ),
  });

  // Helper functions
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Users
  const addUser = (user) => {
    state.usersDB.push({ id: new Date().getTime().toString(), ...user });
    saveToLocalStorage("tickHubUsers", state.usersDB);
  };

  //   const getUsers = computed(() => state.usersDB);
  const getUsers = () => state.usersDB;

  const login = (user) => {
    state.ticketappSession = {
      user,
      token: Date.now() * Math.floor(Math.random()) + user.firstName.charAt(0),
    };
    saveToLocalStorage("ticketapp_session", state.ticketappSession);
  };

  // Tickets
  const addTicket = (ticket) => {
    state.ticketsDB.unshift({ id: new Date().getTime().toString(), ...ticket });
    saveToLocalStorage("tickHubTickets", state.ticketsDB);
  };

  const getTickets = () => state.ticketsDB;

  const updateTicket = (ticket) => {
    state.ticketsDB = state.ticketsDB.map((ticketItem) =>
      ticketItem.id === ticket.id ? { ...ticket } : ticketItem
    );
    saveToLocalStorage("tickHubTickets", state.ticketsDB);
  };

  const deleteTicket = (id) => {
    state.ticketsDB = state.ticketsDB.filter(
      (ticketItem) => ticketItem.id !== id
    );
    saveToLocalStorage("tickHubTickets", state.ticketsDB);
  };

  return {
    state,
    addUser,
    getUsers,
    addTicket,
    getTickets,
    updateTicket,
    deleteTicket,
  };
}
