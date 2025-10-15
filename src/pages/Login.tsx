const Login: React.FC = () => {
  return (
    <>
    <section className="container my-5">
      <h2 className="text-center mb-4"> Iniciar Sesion</h2>
      <form id="formLogin" className="p-4 border rounded bg-light shadow">
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo electronico</label>
          <input type="email" className="form-control" id="correo" required/>
        </div>

        <div className="">

        </div>
      </form>
    </section>    
    </>
  );
}
export default Login;