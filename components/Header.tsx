import React, {useContext, useEffect, useState} from 'react';
import { getCategories } from '../services';
import Link from 'next/link';

// const categories = [
//     { name: 'All', slug: 'all' },
//     { name: 'React', slug: 'react' },
//     { name: 'Vue', slug: 'vue'},
//     { name: 'Web Development', slug: 'web-dev'},
// ]

const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((result) => setCategories(result))
    }, []);

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-blue-400 py-8">
                <div className="md:float-left block">
                    <Link href="/" >
                        <span className="cursor-pointer font-bold text-4xl text-white">
                            Graph-Blog
                        </span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {categories.map((category) => (
                        <Link href={`/category/${category.slug}`} key={category.slug}>
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                                {category.name}
                            </span>
                        </Link>
                    )  )}
                </div>
            </div>
        </div>
    )
}

export default Header;