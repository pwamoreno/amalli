import React, { useState } from "react";
import { Send, Mail, CheckCircle, XCircle, Loader } from "lucide-react";
import { PressableButton } from "@/components/common/pressable-button";
import { sendNewsletter } from "@/store/admin/newsletter-slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function AdminNewsletter() {
  const dispatch = useDispatch();

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSendNewsletter = async () => {
    setLoading(true);
    setResult(null);

    try {
      const data = await dispatch(
        sendNewsletter({ subject, content })
      ).unwrap();

      if (data.success) {
        setResult({
          success: true,
          sent: data.sent,
          failed: data.failed,
          total: data.total,
        });

        if (data.sent > 0) {
          setSubject("");
          setContent("");
        }

        toast(data.message, {
          style: { background: "#22c55e", color: "white" },
        });
      } else {
        toast(data.message, {
          style: { background: "#fa113d", color: "white" },
        });
      }
    } catch (error) {
      console.log(error);
      setResult({
        success: false,
        message: "Network error. Please try again.",
      });

      toast("Network error. Please try again.", {
        style: { background: "#fa113d", color: "white" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">
                Sender a Newsletter
            </h1>
          </div>
          <p className="text-gray-600">
            Send newsletters to all your active subscribers
          </p>
        </div>

        {/* Result Alert */}
        {result && (
          <div
            className={`rounded-lg p-4 mb-6 flex items-start gap-3 ${
              result.success
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {result.success ? (
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h3
                className={`font-semibold mb-1 ${
                  result.success ? "text-green-800" : "text-red-800"
                }`}
              >
                {result.success ? "Success!" : "Error"}
              </h3>
              <p className={result.success ? "text-green-700" : "text-red-700"}>
                {result.message}
              </p>
              {result.success && result.sent > 0 && (
                <div className="mt-2 text-sm text-green-700">
                  <p>✅ Successfully sent: {result.sent}</p>
                  {result.failed > 0 && <p>❌ Failed: {result.failed}</p>}
                  <p>📧 Total subscribers: {result.total}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* Subject Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Exclusive 20% Off This Weekend!"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                disabled={loading}
              />
            </div>

            {/* Content Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Content (HTML Supported)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your newsletter content here. You can use HTML tags like <strong>, <a>, <h2>, etc."
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition font-mono text-sm"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Use HTML for formatting. Example:
                &lt;h2&gt;Title&lt;/h2&gt; &lt;p&gt;Content&lt;/p&gt;
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <PressableButton
                onClick={handlePreview}
                className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
                disabled={loading || !subject || !content}
              >
                {previewMode ? "Hide Preview" : "Preview"}
              </PressableButton>

              <PressableButton
                onClick={handleSendNewsletter}
                disabled={loading || !subject.trim() || !content.trim()}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Newsletter
                  </>
                )}
              </PressableButton>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        {previewMode && subject && content && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              📧 Email Preview
            </h3>
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="bg-white p-6 rounded shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">
                  {subject}
                </h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Quick Templates */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            📝 Quick Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <PressableButton
              variant="outline"
              onClick={() => {
                setSubject("🎉 Exclusive Offer Just For You!");
                setContent(`<h2>Special Discount Inside!</h2>
                    <p>Hello valued customer,</p>
                    <p>We're excited to offer you an <strong>exclusive 20% discount</strong> on all jewelry items this weekend!</p>
                    <p><a href="https://yoursite.com/shop" style="background: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Shop Now</a></p>
                    <p>Use code: <strong>EXCLUSIVE20</strong></p>
                    <p>Best regards,<br>Your Jewelry Team</p>`);
              }}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition"
            >
              <div className="text-sm font-semibold text-gray-800">
                Sale Announcement
              </div>
              <div className="text-xs text-gray-600">
                Promote a special discount
              </div>
            </PressableButton>

            <PressableButton
              variant="outline"
              onClick={() => {
                setSubject("✨ New Collection Launch!");
                setContent(`<h2>Discover Our Latest Collection</h2>
                    <p>We're thrilled to introduce our newest jewelry collection!</p>
                    <p>Featuring stunning designs crafted with premium materials, this collection embodies elegance and sophistication.</p>
                    <p><a href="https://yoursite.com/new-collection" style="background: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Collection</a></p>
                    <p>Limited quantities available!</p>`);
              }}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition"
            >
              <div className="text-sm font-semibold text-gray-800">New Collection</div>
              <div className="text-xs text-gray-600">Announce new products</div>
            </PressableButton>
          </div>
        </div>
      </div>
    </div>
  );
}
