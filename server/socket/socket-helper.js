export const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(); // Getting the data from DarkSky
    socket.emit("FromAPI", res.data.currently.temperature); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};