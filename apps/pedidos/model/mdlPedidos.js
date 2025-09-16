const db = require("../../../database/databaseconfig");

const getAllPedidos = async () => {
  return (
    await db.query(
      "SELECT p.*, c.nome as cliente_nome " +
        "FROM pedidos p INNER JOIN clientes c ON c.clienteid = p.clienteid " +
        "WHERE p.deleted = false ORDER BY p.data DESC"
    )
  ).rows;
};

const getPedidoByID = async (pedidoIDPar) => {
  return (
    await db.query(
      "SELECT p.*, c.nome as cliente_nome " +
        "FROM pedidos p INNER JOIN clientes c ON c.clienteid = p.clienteid " +
        "WHERE p.pedidoid = $1 AND p.deleted = false",
      [pedidoIDPar]
    )
  ).rows;
};

const insertPedidos = async (pedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO pedidos values(default, $1, $2, $3, $4, $5)",
        [
          pedidoREGPar.numero,
          pedidoREGPar.data,
          pedidoREGPar.valortotal,
          pedidoREGPar.clienteid,
          pedidoREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|insertPedidos] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const updatePedidos = async (pedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE pedidos SET numero=$2, data=$3, valortotal=$4, clienteid=$5, deleted=$6 WHERE pedidoid=$1",
        [
          pedidoREGPar.pedidoid,
          pedidoREGPar.numero,
          pedidoREGPar.data,
          pedidoREGPar.valortotal,
          pedidoREGPar.clienteid,
          pedidoREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|updatePedidos] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const deletePedidos = async (pedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query("UPDATE pedidos SET deleted = true WHERE pedidoid = $1", [
        pedidoREGPar.pedidoid,
      ])
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|deletePedidos] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

module.exports = {
  getAllPedidos,
  getPedidoByID,
  insertPedidos,
  updatePedidos,
  deletePedidos,
};
