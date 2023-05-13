export const useFecha = (props) => {
  const timestamp = props;
  const dia = parseInt(timestamp);
  const data = new Date(dia).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return { data };
};
