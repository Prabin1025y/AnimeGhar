import React from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Globe, Code,  Users, Tv } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
    title: "About - AnimeGhar | Nepal's #1 Anime Streaming Platform",
    description: "Learn about AnimeGhar, Nepal's premier anime streaming platform. Discover our mission, meet the developer, and join our growing community of anime enthusiasts.",
    keywords: "AnimeGhar, about, anime streaming, Nepal, developer, Prabin Acharya, open source"
}

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-24">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-800">
                        🎌 About AnimeGhar
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                        About Our Project
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Discover the story behind AnimeGhar, a platform built with passion and dedication.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid gap-8">
                    {/* Project Description */}
                    <div className='md:grid-cols-2 grid gap-8'>
                        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-2xl">
                                    <Tv className="w-6 h-6 text-cyan-600" />
                                    About AnimeGhar
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    AnimeGhar is a modern, feature-rich anime streaming platform designed specifically for anime enthusiasts in Nepal and beyond.
                                    Built with cutting-edge web technologies, our platform offers a seamless viewing experience with high-quality streaming,
                                    multiple language options, and a vast library of anime series and movies.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    AnimeGhar is not perfect yet, there are many updates and bug fixes to be done, but we are committed to continuously improving the platform.
                                    Your feedback is always welcome!
                                </p>

                                {/* Tech Stack */}
                                <div className="mt-6">
                                    <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Built With</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shadcn/UI', 'Lucide Icons'].map((tech) => (
                                            <Badge key={tech} variant="outline" className="bg-cyan-50 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Author Section */}
                        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-2xl">
                                    <Code className="w-6 h-6 text-cyan-600" />
                                    Meet the Developer
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-6 items-center md:items-start">
                                    {/* Author Image */}
                                    <div className='flex flex-col items-center justify-center w-full'>
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-200 dark:border-cyan-700 shadow-lg bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-800 dark:to-blue-800">
                                            <Image src={"/pp.jpg"} alt="Author Image" layout="fill" objectFit="cover" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mx-auto">
                                            Prabin Acharya
                                        </h3>
                                        <p className='text-sm text-gray-400'>FullStack Developer</p>
                                    </div>

                                    {/* Author Info */}
                                    <div className="flex-1 text-center md:text-left">
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-justify">
                                            AnimeGhar is a result of my passion for anime and modern web development which aims to provide a user-friendly platform for anime lovers.
                                            As a full-stack developer from Nepal, I am dedicated to creating applications that bring entertainment and joy to users worldwide.
                                            Please enjoy your time here, and give any feedback you have to help us improve the platform.
                                        </p>

                                        {/* Skills */}
                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Expertise</h4>
                                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                                {['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'MongoDB'].map((skill) => (
                                                    <Badge key={skill} variant="secondary" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Social Links */}
                                        <div className="flex gap-3 justify-center md:justify-start">
                                            <Button variant="outline" size="sm" asChild className="hover:bg-cyan-50 dark:hover:bg-cyan-900/50">
                                                <Link href="https://github.com/Prabin1025y" target="_blank" rel="noopener noreferrer">
                                                    <Github className="w-4 h-4 mr-2" />
                                                    GitHub
                                                </Link>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild className="hover:bg-cyan-50 dark:hover:bg-cyan-900/50">
                                                <Link href="https://prabinacharya1.com.np" target="_blank" rel="noopener noreferrer">
                                                    <Globe className="w-4 h-4 mr-2" />
                                                    Portfolio
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-8">

                        {/* Contribute Section */}
                        <Card className="border-0 shadow-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/5 dark:to-blue-500/5 backdrop-blur-sm">
                            <CardHeader className="text-center">
                                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                                    <Users className="w-6 h-6 text-cyan-600" />
                                    Join Our Community
                                </CardTitle>
                                <CardDescription className="text-base">
                                    Help us make AnimeGhar even better by contributing to the project
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-center space-y-6">
                                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                    AnimeGhar is an open-source project and we welcome contributions from developers, designers, and anime enthusiasts.
                                    Whether it&apos;s fixing bugs, adding new features, or improving the user experience, every contribution matters.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                                        <Link href="https://github.com/Prabin1025y/AnimeGhar" target="_blank" rel="noopener noreferrer">
                                            <Github className="w-5 h-5 mr-2" />
                                            Contribute on GitHub
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="lg" asChild className="hover:bg-cyan-50 dark:hover:bg-cyan-900/50">
                                        <Link href="https://github.com/Prabin1025y/AnimeGhar/issues" target="_blank" rel="noopener noreferrer">
                                            Report Issues
                                        </Link>
                                    </Button>
                                </div>

                                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                                    {[
                                        { title: "🐛 Bug Reports", desc: "Found a bug? Let us know!" },
                                        { title: "💡 Feature Requests", desc: "Have an idea? We'd love to hear it!" },
                                        { title: "🎨 Update UI", desc: "Help improve our UI" }
                                    ].map((item, index) => (
                                        <div key={index} className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
                                            <h4 className="font-medium mb-2">{item.title}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage