import Link from 'next/link';

interface BreadcrumbProps {
    routes: { name: string, path: string }[];
}

const Breadcrumb = ({ routes }: BreadcrumbProps) => {
    return (
        <div className="text-gray-600 mb-4">
            {routes.map((route, index) => (
                <span key={index}>
                    <Link href={route.path} className="hover:text-blue-500">
                        {route.name}
                    </Link>
                    {index < routes.length - 1 && <span className="mx-2">/</span>}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumb;
