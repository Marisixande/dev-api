export default function Refris({refrisB}) {
    return (
        <ul>
            {refrisB.map((refri)=>(
                <li key={refri.id_refri}>
                   <p>Nome do refrigerante: {refri.nome_refri}</p>
                   <p>Quantidade: {refri.quantidade}</p>
                </li>
            ))}
        </ul>
    )
}