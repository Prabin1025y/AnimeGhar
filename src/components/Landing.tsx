"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Play, Star, Tv, Download, Menu, X, ArrowRight, Globe, Smartphone, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

const features = [
    {
        icon: Tv,
        title: "HD Streaming",
        description: "Watch your favorite anime in crystal clear HD quality with no buffering.",
    },
    {
        icon: Download,
        title: "Offline Viewing",
        description: "Download episodes to watch offline anytime, anywhere without internet.",
    },
    {
        icon: Globe,
        title: "Multi-Language",
        description: "Enjoy anime with subtitles and dubbing in multiple languages.",
    },
    {
        icon: Smartphone,
        title: "All Devices",
        description: "Stream seamlessly across all your devices - phone, tablet, TV, and desktop.",
    },
]

export default function Landing() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div>
                            <Badge variant="secondary" className="mb-4bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-800">
                                🎌 Nepal's #1 Anime Streaming Platform
                            </Badge>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                                Your Gateway to Anime Universe
                            </h1>

                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                Discover thousands of anime series and movies. From classic masterpieces to the latest releases, stream
                                your favorite anime in HD quality with subtitles and dubbing options.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-gradient-to-r rounded-full w-full cursor-pointer from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 text-lg group"
                                >
                                    <Link href="/home">
                                        <Play className="mr-2 w-5 h-5" />
                                        Start Watching Now
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { value: "10K+", label: "Anime Episodes" },
                                    { value: "500+", label: "Series Available" },
                                    { value: "1M+", label: "Happy Users" },
                                    { value: "50+", label: "Languages" },
                                ].map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl sm:text-3xl font-bold text-cyan-600 dark:text-cyan-400">{stat.value}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Search Bar */}
                            <div className="mt-12 max-w-2xl mx-auto">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        type="text"
                                        placeholder="Search for anime, movies, or genres..."
                                        value={searchQuery}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                        className="pl-12 pr-4 py-4 text-lg border-2 border-cyan-200 dark:border-cyan-700 focus:border-cyan-400 dark:focus:border-cyan-500 rounded-xl bg-white/80 dark:bg-gray-800/80 dark:text-gray-100 text-gray-900 backdrop-blur-sm"
                                    />
                                    <Button
                                        size="sm"
                                        className="absolute right-0 rounded-lg top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                                    >
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail/Hero Image */}
                        <div className="relative">
                            <Image
                                src="/landing.png"
                                width={800}
                                height={600}
                                alt="Featured Anime"
                                className="w-full h-auto drop-shadow-2xl shadow-cyan-500 transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white/50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Why Choose AnimeStream?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Experience anime like never before with our premium streaming features designed for true anime
                            enthusiasts.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:-translate-y-2"
                            >
                                <CardHeader className="text-center pb-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
