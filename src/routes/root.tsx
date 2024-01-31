import React from "react";
import { useEffect } from "react";
import {
	RedirectToSignIn,
	SignedIn,
	SignedOut,
	useAuth,
	UserButton
} from "@clerk/clerk-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Root() {
	const location = useLocation();
	const { isLoaded, isSignedIn } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (location.pathname === "/react") {
			if (isLoaded && isSignedIn) {
				navigate("/react/home");
			}
		}
	});
	return (
		<>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
			<SignedIn>
				<UserButton />
				<Outlet />
			</SignedIn>
		</>
	);
}
