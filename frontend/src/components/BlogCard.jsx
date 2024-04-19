function BlogCard() {
  return (
    <div
      className="relative text-gray-100 px-3 py-2 w-full"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      <div className="relative z-10">
        <div className="text-xl font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-green-700 text-transparent bg-clip-text">Music Hallucination</div>
        <div className="flex flex-row justify-between">
          <span>14 April 2024</span> <span>By VKY</span>
        </div>
        <div className="text-basem mt-2">
          A Pantheon of music that sets up something in an attempt in a sir to
          what the fuck did you write
        </div>
        <div className="flex justify-end">
          <button
            className="px-2 py-1 bg-green-800 bg-opacity-30"
          >Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;