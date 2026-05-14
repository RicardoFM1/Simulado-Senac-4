import { Col, Row, Table } from "react-bootstrap";


const Tabela = ({ columns, rows, key }) => {
    const temDados = rows && rows.length > 0
    return (
        <Table responsive bordered hover>
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column.accessor}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {temDados ? (
                    rows.map(row => (
                        <tr key={row[key]}>
                            {columns.map(column => (
                                <td key={column.accessor}>{column.render ? column.render(row) : row[column.accessor]}</td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <td colSpan={columns.length} className="text-center text-mute">Sem dados</td>
                )}
            </tbody>
        </Table>
    )
}

export default Tabela;