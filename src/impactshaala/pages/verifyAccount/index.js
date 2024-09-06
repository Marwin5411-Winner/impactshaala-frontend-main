import { useEffect, useState } from "react";
import { verifyAccountToken } from "../../../api/onboarding";
import { useLocation, useNavigate } from 'react-router-dom'; 

const VerifyAccount = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const [isVerified, setIsVerified] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [verificationError, setVerificationError] = useState('')

	const verifyAccount = async (isMounted) => {
		if(isMounted) {
			const encodedToken = location.pathname.split("/").slice(-1)[0]
			const token = decodeURIComponent(encodedToken)
			setIsLoading(true)
			verifyAccountToken(token)
				.then((resp) => {
					setIsVerified(true)
					setTimeout(() => {
						navigate("/login")
					}, 5000)
				})
				.catch(err => {
					setVerificationError('Could not verify')
					setTimeout(() => navigate("/login"), 3000)
				})
				.finally(() => {
					setIsLoading(false)				
				})
		}
	}

	useEffect(() => {
		let isMounted = true
		
		if(!verificationError && !isVerified)
			verifyAccount(isMounted)

		return () => {
			isMounted = false;
		} 
	}, [])

	return (
		<div className={`nc-PageLogin`} data-nc-id="PageLogin">
       <div className="container mb-24 lg:mb-32">
         <h2 
				 	// className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center"
					className="d-flex justify-content-center font-semibold text-center"
					style={{margin: "10rem 0px 3rem 0px", fontSize: "3rem"}}
				>
           {isLoading && ("Verifying your account.")}
           {isVerified && ("Your account is verified successfully.")}
           {verificationError && ("Failed to verify your account.")}
         </h2>
         <div>
           {isLoading && (
           	<div role="status" className="d-flex flex-row justify-content-center">
							<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" style={{width: "100px", height: "100px"}}
								viewBox="0 0 100 100" enable-background="new 0 0 0 0" >
									<path fill="" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
										<animateTransform 
											attributeName="transform" 
											attributeType="XML" 
											type="rotate"
											dur="1s" 
											from="0 50 50"
											to="360 50 50" 
											repeatCount="indefinite" />
								</path>
							</svg>
          	</div>
          )}
          {isVerified && (
            <div>
              <div className="d-flex flex-row justify-content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={100} height={100} version="1.1" id="Capa_1" viewBox="0 0 50 50" xmlSpace="preserve">
                      <circle style={{ fill: '#25AE88' }} cx="25" cy="25" r="25" />
                      <polyline style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10 }} points="38,15 22,33 12,25" />
                  </svg>
              </div>
              <p className="mt-5 text-center" style={{fontSize: "1.5rem"}}>Redirecting to login page...</p>
            </div>
          )}
          {verificationError && (
						<div>
							<div className="d-flex flex-row justify-content-center">
								<svg xmlns="http://www.w3.org/2000/svg" fill="#ff0000" width="100" height="100" viewBox="0 -8 528 528"><title>fail</title><path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z"/></svg>
							</div>
							<p className="mt-5 text-center" style={{fontSize: "1.5rem"}}>Redirecting to login page...</p>
						</div>
          )}
        </div>
      </div>
    </div>
	)
}

export default VerifyAccount;


// export interface PageLoginProps {
//   className?: string;
// }

// const VerifyAccount: FC<PageLoginProps> = ({ className = "" }) => {

//   const navigate = useNavigate();
//   let { token } = useParams();

//   const [loading, setLoading] = useState(true);
//   const [success, setSuccess] = useState(false);
//   const [verificationError, setVerificationError] = useState(false);

//   async function verifyToken(){
//     if(!token) return
//     try {
//       const subdomain = window.location.host.split('.')[0]
//       const res = await verifyAccount(subdomain, token);
//       const data = res && res.data;
//       setLoading(false);
//       if(data){
//         setSuccess(true);
//         toast.success("Your account is verified successfully.");
//         setLoading(false);
        
//       } else {
//         setVerificationError(true);
//         toast.error("The link is expired");
//       }
//     } catch (error) {
//       setLoading(false);
//       setVerificationError(true);
//       toast.error("The link is expired, and failed to verify.");
//     } 
//   }

//   useEffect(() => {
//     verifyToken();
//   }, [])

//   useEffect(() => {
//     if(success)
//       setTimeout(() => {
//         navigate("/login")
//       }, 3000)
//   }, [success])

//   return (
//     <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
//       <div className="container mb-24 lg:mb-32">
        
//         <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
//           {loading && ("Verifying your account.")}
//           {success && ("Your account is verified successfully.")}
//           {verificationError && ("Failed to verify your account.")}
//         </h2>
//         <div className="max-w-md mx-auto space-y-6 relative justify-center flex items-center">
//           {loading && (
//            <div role="status">
//            <svg aria-hidden="true" className=" w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
//                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
//                 </svg>
//             </div>
//           )}
//           {success && (
//             <div>
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                   <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={100} height={100} version="1.1" id="Capa_1" viewBox="0 0 50 50" xmlSpace="preserve">
//                       <circle style={{ fill: '#25AE88' }} cx="25" cy="25" r="25" />
//                       <polyline style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10 }} points="38,15 22,33 12,25" />
//                   </svg>
//               </div>
//               <p className="translate-y-[90px]">Redirecting to login page...</p>
//             </div>
//           )}
//           {verificationError && (
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="#ff0000" width="100" height="100" viewBox="0 -8 528 528"><title>fail</title><path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z"/></svg>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyAccount;
