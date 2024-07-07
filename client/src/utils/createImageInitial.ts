export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export const createImageFromInitials = (
  size: number,
  name: string,
  color: string
) => {
  // Ensure name is not empty or undefined
  if (!name) {
    throw new Error("Name must be provided.");
  }
  const initials: string = getInitials(name); // Corrected variable name

  // Create the canvas
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas context is not available.");
  }

  canvas.width = canvas.height = size;

  // Fill background
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  // Fill semi-transparent overlay
  context.fillStyle = `rgba(${color}, 0.5)`;
  context.fillRect(0, 0, size, size);

  // Fill text
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `${size / 2}px Satoshi`;
  context.fillText(initials, size / 2, size / 2); // Corrected variable name

  return canvas.toDataURL();
};

const getInitials = (name: string) => {
  let initials: string;
  const nameSplit = name.split(" ");
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
    initials =
      nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1);
  } else {
    initials = ""; // Provide a default value
  }

  return initials.toUpperCase();
};
