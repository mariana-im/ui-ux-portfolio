import Image1 from '/sazonlocal/image1.png'
import Image2 from '/sazonlocal/image2.png'
import Image3 from '/sazonlocal/image3.png'

const SazonLocal = () => {
    return (
        <div className="overflow-x-hidden bg-[#FFF4EC] p-20 pb-0 overflow-hidden assistant items-center flex flex-col text-center">
            <div className="pb-5">
                <div className="sinoreta text-7xl">Sazón Local</div>
                <div className="text-3xl">Mobile Cooking App</div>
            </div>
            <div className="bg-[#FFF7F1] w-screen">
                <div className="text-2xl">
                    <div className="p-20">Sazón Local is a mobile app prototype that connects users with recipes based on products from a local grocery store. The goal was to encourage home cooking while supporting local commerce.</div>
                    <img className="w-screen" src={Image1}/>
                    <div className="p-20">Using Figma we created wireframes and an interactive prototype focused on a smooth, mobile-first experience. The design allows users to easily explore recipes, ingredients, and categories through clear navigation and a clean visual style.</div>
                    <img className='w-screen' src={Image2}/>
                    <div className="p-20">Sazón Local demonstrates how local businesses can expand their digital presence with an intuitive and engaging platform. The prototype showcases the potential for a real app that benefits users and local markets.</div>
                    <img className="w-screen" src={Image3}/>
                </div>
                <div className='bg-[#FFF4EC] sinoreta justify-evenly justify-center flex p-5 font-medium'>
                    <div>Mariana Islas Mondragón</div>
                    <div>marianaislasm2004@gmail.com</div>
                    <div>+52 (662) 165 4217</div>
                </div>
            </div>
            
        </div>
    );
};

export default SazonLocal