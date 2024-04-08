const profesionalFinder = async (params, data) => {
  const url = params.detallesId;
  const matricula = url.match(/[0-9-]/g).join("");
  const profesional = await data.profesionales.find(
    (e) => e.matricula === matricula
  );
  return profesional;
};

export default profesionalFinder;
