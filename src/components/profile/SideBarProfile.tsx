import { Link } from "react-router-dom";

export interface SideBarElements {
    title: string;
    elements: {
        name: string;
        linkTo: string;
    }[];
}

export type SideBarProfileProps = {
    onPageChange: (name: string) => void;
};

const SideBatProfile = ({ onPageChange }: SideBarProfileProps) => {

    const elementsSideBar: SideBarElements[] = [
        {
            title: "Purchases",
            elements: [
                {
                    name: "Purchase History",
                    linkTo: "/myaccount/purchase-history"
                },
                {
                    name: "Paint Purchase History",
                    linkTo: "/myaccount/paintPurchaseHistory"
                },
                {
                    name: "Subscriptions",
                    linkTo: "/myaccount/ordersubscription"
                },
            ]
        },
        {
            title: "Payment Methods",
            elements: [
                {
                    name: "Cards & Accounts",
                    linkTo: "/myaccount/payments"
                },
                {
                    name: "Home Depot Credit Cards",
                    linkTo: "/myaccount/thdcreditcard"
                },
                {
                    name: "Instant Checkout",
                    linkTo: "/myaccount/payments/instant-checkout"
                },
            ]
        },
        {
            title: "Account Settings",
            elements: [
                {
                    name: "Profile",
                    linkTo: "/myaccount/profile",
                },
                {
                    name: "Addresses",
                    linkTo: "/myaccount/addresses",
                },
                {
                    name: "Military Discount Benefit",
                    linkTo: "/military/discount",
                },
                {
                    name: "Security & Password",
                    linkTo: "/myaccount/security",
                },
                {
                    name: "Communication Preferences",
                    linkTo: "/myaccount/preferences",
                }                
            ]
        },
        {
            title: "Plan Your Projects",
            elements: [
                {
                    name: "Product Lists",
                    linkTo: "/list/view/summary",
                },
                {
                    name: "Window Treatments",
                    linkTo: "/MyWindowTreatments",
                }
            ]
        }
    ]

    return (
        <>
            <div className="sidebar">
                {
                    elementsSideBar.map((section) => {
                        return (
                            <div>     
                                <h5>{section.title}</h5>
                                <ul>
                                    {
                                        section.elements.map(({name, linkTo}) => {
                                            return (
                                                <li className="sidebar-li">
                                                    <Link to={linkTo} className="link" onClick={() => onPageChange(name)}>{name}</Link>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default SideBatProfile;