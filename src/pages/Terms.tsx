import { Layout } from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { SITE_URL } from "@/lib/seo";

const termsSEO = {
  title: "Terms of Service | OpenAlgon",
  description: "Read the OpenAlgon Terms of Service.",
  keywords: "terms of service, terms and conditions, OpenAlgon terms",
  canonical: `${SITE_URL}/terms`,
};

const Terms = () => {
  return (
    <Layout>
      <SEOHead {...termsSEO} />
      <div className="container-page py-24 lg:py-32">
        <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
          <h1>Terms of Service</h1>
          <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Terms</h2>
          <p>
            By accessing the website at OpenAlgon, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on OpenAlgon's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on OpenAlgon's website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>
            The materials on OpenAlgon's website are provided on an 'as is' basis. OpenAlgon makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall OpenAlgon or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on OpenAlgon's website, even if OpenAlgon or a OpenAlgon authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h2>5. Revisions and Errata</h2>
          <p>
            The materials appearing on OpenAlgon's website could include technical, typographical, or photographic errors. OpenAlgon does not warrant that any of the materials on its website are accurate, complete or current. OpenAlgon may make changes to the materials contained on its website at any time without notice.
          </p>

          <h2>6. Contact</h2>
          <p>
            For any questions regarding these Terms of Service, please contact us at: <a href="mailto:info@openalgon.com">info@openalgon.com</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
