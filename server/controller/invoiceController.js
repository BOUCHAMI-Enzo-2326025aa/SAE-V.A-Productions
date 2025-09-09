import fs from "fs";
import createInvoice from "../utils/invoiceCreator.js";
import Invoice from "../model/invoiceModel.js";
import path from "path";

export const createFacture = async (req, res) => {
  try {
    const client = req.body.invoice.client;
    const tva = req.body.tva.percentage;
    const { number: maxNumber = 0 } =
      (await Invoice.findOne().sort({ number: -1 })) || {};
    const facture = await Invoice.create({
      client: client.clientId,
      entreprise: client.compagnyName,
      number: maxNumber + 1,
      date: Date.now(),
      firstAddress: client.address1,
      secondAddress: client.address2,
      postalCode: client.postalCode,
      city: client.city,
      supportList: client.support,
      totalPrice: client.totalPrice,
    });

    // Appel à la fonction pour créer et envoyer le PDF
    createInvoice(facture, res, facture.number, tva);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erreur: error.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ number: -1 });
    res.status(200).json(invoices);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erreur: error.message });
  }
};

export const getClientInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ client: req.params.id }).sort({
      number: -1,
    });
    res.status(200).json(invoices);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erreur: error.message });
  }
}

export const getInvoicesByCompany = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      entreprise: req.params.entreprise,
    }).sort({ number: -1 });
    res.status(200).json(invoices);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erreur: error.message });
  }
};

export const getInvoicesPdf = async (req, res) => {
  try {
    const id = req.params.id;
    const invoice = await Invoice.findById(id);

    const fileName = `${invoice.entreprise.toUpperCase()}-${
      invoice.number
    }.pdf`;
    const filePath = path.resolve(process.cwd(), `./invoices/${fileName}`);

    // Si le fichier n'existe pas, générez-le
    if (!fs.existsSync(filePath)) {
      console.log("Création du fichier PDF manquant...");
      await createInvoice(invoice, res, invoice.number, invoice.tva);
      return; // La génération gère la réponse
    }

    // Si le fichier existe déjà, l'envoyer directement
    console.log("Envoi du fichier PDF :", filePath);
    res.setHeader("Content-Type", "application/pdf");

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Erreur lors de l'envoi du PDF :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await Invoice.find({}, { entreprise: 1, _id: 0 }).distinct(
      "entreprise"
    );
    res.status(200).json(clients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erreur: error.message });
  }
};

export const validateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    invoice.status = "paid";
    await invoice.save();
    res.status(200).json({ message: "Facture validée" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erreur: error.message });
  }
}
