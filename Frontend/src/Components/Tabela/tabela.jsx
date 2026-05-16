import { Col, Row, Table } from "react-bootstrap";

const Tabela = ({ columns, rows, chave }) => {
  const temDados = rows && rows.length > 0;
  return (
    <Table responsive bordered hover>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {temDados ? (
          rows.map((row) => (
            <tr key={row[chave]}>
              {columns.map((column) => (
                <td key={column.accessor}>
                  {column.accessor === "usuario"
                    ? row["usuario"]["nome"] +
                      " " +
                      "-" +
                      " " +
                      row["usuario"]["cpf"]
                    : column.accessor === "convidado"
                      ? row["convidado"]["nome"] +
                        " " +
                        "-" +
                        " " +
                        row["convidado"]["cpf"]
                      : column.render
                        ? column.render(row)
                        : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center text-mute">
              Sem dados
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default Tabela;
