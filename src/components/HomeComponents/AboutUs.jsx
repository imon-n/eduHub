import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";

export default function AboutUs() {
  return (
    <section id="about" className="py-16 ">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#96ac35] mb-6"
        >
          About Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
        >
          Welcome to{" "}
          <span className="font-semibold text-[#96ac35]">EduHub</span>, your
          trusted platform for learning and growth. Our mission is to empower
          students and professionals with the skills they need to succeed.
        </motion.p>

        {/* Cards Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#ecefde] rounded-2xl shadow-md p-6"
          >
            <h3 className="text-xl font-semibold text-[#96ac35] mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To empower learners by providing high-quality courses and tools
              for success in academics and beyond.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#ecefde] rounded-2xl shadow-md p-6"
          >
            <h3 className="text-xl font-semibold text-[#96ac35] mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600">
              A future where education is not limited by boundaries and everyone
              has equal access to knowledge.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#ecefde] rounded-2xl shadow-md p-6"
          >
            <h3 className="text-xl font-semibold text-[#96ac35] mb-2">
              Our Values
            </h3>
            <p className="text-gray-600">
              Innovation, inclusivity, and impact drive us to create a
              collaborative and effective learning ecosystem.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex justify-center gap-6"
        >
          <Link to="/courses" className="px-8 md:px-24 py-3 bg-[#96ac35] text-white font-semibold rounded-2xl shadow-lg hover:bg-[#7e922d] transition">
            See available Courses
          </Link>
          
        </motion.div>
      </div>
    </section>
  );
}
