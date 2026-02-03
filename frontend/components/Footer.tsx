export default function Footer(){
  return( 
  <footer className="w-full bg-[#cb8967]"> 
    <div className="mx-auto max-w-5xl py-4 text-center"> 
      <p className="text-sm text-white">
        © {new Date().getFullYear()} Saori Portfolio
      </p> 
    </div> 
  </footer> 
  ); 
}
