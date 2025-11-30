import Products1 from "./Products1";
import Logo from "./Logo";
import { CartProvider } from "./CartProvider";

export default function Cart() {    
    return (
    <CartProvider>
<Logo/>
<Products1/>
</CartProvider>
)   
}