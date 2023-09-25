import Cart from "../models/Cart"

export const addToCart = async (req: any, res: any) => {
    const id = req.verified.id
    const cart = new Cart({ ...req.body, userId: id })
    try {
        await cart.save()
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const fetchUserCart = async (req: any, res: any) => {
    const user = req.verified.id;
    try {
        const userCart = await Cart.find({ userId: user }).populate('productId')
        res.status(200).json(userCart)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteFromCart = async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const cart = await Cart.findByIdAndDelete(id)
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
}