import { Product } from "../models/product.js";

export async function getProducts(req, res, next) {
    try {
        const data = await Product.find();
        res.json(data);
    } catch (error) {
        next(error);
    }
}
export async function createProducts(req, res, next) {
    try {
        const data = await Product.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

export async function deleteProduct(req, res, next) {
    try {
        const { id } = req.params;

        const data = await Product.findByIdAndDelete(id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export async function updateProduct(req, res, next) {
    try {
        const { id } = req.params;

        const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export async function updateProductSale(req, res, next) {
    try {
        const { id } = req.params;

        const data = await Product.findByIdAndUpdate(id, req.body, { new: true, projection: { sale: 1 } });
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}
