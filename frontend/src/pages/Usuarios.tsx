import Main from '../components/template/Main';

const Usuarios = () => {
return (
    <Main icon="user" title="Usuários">
      <div className="p-3">
        
        <div className="d-flex justify-content-between pb-3">
          <button className="btn btn-success">
            <i className="fa fa-plus-square px-2"></i>
              Lorem Ipsum
          </button>
        </div>

        <table className="table table-bordered mt-4">
      <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>            
          </tr>
      </thead>

      <tbody>
          <tr>
            <th>Teste</th>
            <th>Teste@gmail.com</th>
          </tr>
          </tbody>

        </table>
        
        </div>
    </Main>
  );
};
export default Usuarios;