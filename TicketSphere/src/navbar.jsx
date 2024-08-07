import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Button } from "antd";

export default function Navbar() {
    const { user } = useUser();

    const handleAfterSignOut = () => {
        window.location.href = "/";
    };

    const isAdmin = user && (user.fullName === "Ashwanth R" || user.username === "Ashwanth R");

    return (
        <nav className="nav">
            <Link to="/">
                <img src="./src/ticket2.png" alt="" />
            </Link>
            <Link to="/">
            <b className="site-title">TicketSphere</b>
            </Link>
            <div className="nav-links">
                <SignedOut>
                    <Link to="/sign-in" className="dash-comic-button">
                        <b>Login</b>
                    </Link>
                </SignedOut>
                <SignedIn>
                    {isAdmin && (
                        <Button>
                            <Link to="/admin">Admin</Link>
                        </Button>
                    )}
                    <Link to="/dashboard" className="dash-comic-button">
                        <b>Dashboard</b>
                    </Link>
                </SignedIn>
                <Link to="/sellpage" className="sell-comic-button">
                    <b>Sell your Ticket!</b>
                </Link>
                <UserButton afterSignOut={handleAfterSignOut} />
            </div>
        </nav>
    );
}
