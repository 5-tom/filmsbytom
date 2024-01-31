import React from "react";
import { SignIn as ClerkSignIn, useAuth } from "@clerk/clerk-react";

export default function SignIn() {
	const { isLoaded } = useAuth();
	return (
		<>
			{!isLoaded && "Loading..."}
			<ClerkSignIn />
		</>
	);
}
