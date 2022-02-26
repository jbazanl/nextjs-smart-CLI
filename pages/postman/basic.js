import { Button, Alert } from "reactstrap";
import { fetchQuery } from '../../utils'
import utilStyles from '../../styles/utils.module.css'
import Layout from "../../components/layout";

export default ({ proveedors }) => {
  return (
      <>
          <Layout/>
          
          <div className="container">


              {/* <Alert color="primary">
          Hello Project is strapi-next with Bootstrap
        </Alert> */}
              <h2 className="title">
                  Relación de proveedores <code>VoIP</code>
              </h2>

              <main>
                  <div className="grid">
                      {proveedors.map((proveedor) => (
                          <a className="card">
                              <h3>{proveedor.name}</h3>
                              <p>Prefijo: {proveedor.prefix}</p>
                              <p>ANI: {proveedor.callerNumber}</p>
                          </a>
                      ))}
                  </div>
              </main>

              {/* &nbsp; <Button color="primary">Hello from nextjs</Button> */}

              <style jsx>{`

      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        max-width: 800px;
        margin-top: 3rem;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }

      .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
      }

      .card:hover,
      .card:focus,
      .card:active {
        color: #0070f3;
        border-color: #0070f3;
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }

      .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }
      
      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 3rem;
      }

      .title,
      .description {
        text-align: center;
      }

      `}</style>

          </div>

      </>

  );
};

export async function getServerSideProps() {

  const proveedors = await fetchQuery('proveedors')
  return {
    props: {
      proveedors
    }
  }
}

