export const exitProgram = (userName) => {
  const exitMsg = `Thank you for using File Manager, ${userName}, goodbye!`;
  console.log(exitMsg);
  process.exit();
};
