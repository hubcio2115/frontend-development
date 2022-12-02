export default (id: string | undefined) =>
  !!id && !isNaN(parseInt(id)) && parseInt(id) >= 0 && parseInt(id) <= 9;
