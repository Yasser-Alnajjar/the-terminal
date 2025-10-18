const MIMETypes = {
  documents: {
    pdf: [
      {
        name: "pdf",
        template: "application/pdf",
      },
    ],
    word: [
      {
        name: "docx",
        template:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
      {
        name: "doc",
        template:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    ],
    excel: [
      {
        name: "xlsx",
        template:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      {
        name: "xlsm",
        template:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      {
        name: "xlsb",
        template:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      {
        name: "xltx",
        template:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],
    text: [
      {
        name: "txt",
        template: "text/plain",
      },
      {
        name: "cache-manifest",
        template: "text/cache-manifest",
        reference: "[w3c][robin_berjon]",
      },
      {
        name: "calendar",
        template: "text/calendar",
        reference: "[rfc5545]",
      },
      {
        name: "cql",
        template: "text/cql",
        reference: "[hl7][bryn_rhodes]",
      },
      {
        name: "cql-expression",
        template: "text/cql-expression",
        reference: "[hl7][bryn_rhodes]",
      },
      {
        name: "cql-identifier",
        template: "text/cql-identifier",
        reference: "[hl7][bryn_rhodes]",
      },
      {
        name: "css",
        template: "text/css",
        reference: "[rfc2318]",
      },
      {
        name: "csv",
        template: "text/csv",
        reference: "[rfc4180][rfc7111]",
      },
      {
        name: "csv-schema",
        template: "text/csv-schema",
        reference: "[national_archives_uk][david_underdown]",
      },
      {
        name: "directory - deprecated by rfc6350",
        template: "text/directory",
        reference: "[rfc2425][rfc6350]",
      },
      {
        name: "dns",
        template: "text/dns",
        reference: "[rfc4027]",
      },
      {
        name: "ecmascript (obsoleted in favor of text/javascript)",
        template: "text/ecmascript",
        reference: "[rfc9239]",
      },
      {
        name: "encaprtp",
        template: "text/encaprtp",
        reference: "[rfc6849]",
      },
      {
        name: "enriched",
        template: "",
        reference: "[rfc1896]",
      },
      {
        name: "example",
        template: "text/example",
        reference: "[rfc4735]",
      },
      {
        name: "fhirpath",
        template: "text/fhirpath",
        reference: "[hl7][bryn_rhodes]",
      },
      {
        name: "flexfec",
        template: "text/flexfec",
        reference: "[rfc8627]",
      },
      {
        name: "fwdred",
        template: "text/fwdred",
        reference: "[rfc6354]",
      },
      {
        name: "gff3",
        template: "text/gff3",
        reference: "[sequence_ontology]",
      },
      {
        name: "grammar-ref-list",
        template: "text/grammar-ref-list",
        reference: "[rfc6787]",
      },
      {
        name: "hl7v2",
        template: "text/hl7v2",
        reference: "[hl7][marc_duteau]",
      },
      {
        name: "html",
        template: "text/html",
        reference: "[w3c][robin_berjon]",
      },
      {
        name: "javascript",
        template: "text/javascript",
        reference: "[rfc9239]",
      },
      {
        name: "jcr-cnd",
        template: "text/jcr-cnd",
        reference: "[peeter_piegaze]",
      },
      {
        name: "markdown",
        template: "text/markdown",
        reference: "[rfc7763]",
      },
      {
        name: "mizar",
        template: "text/mizar",
        reference: "[jesse_alama]",
      },
      {
        name: "n3",
        template: "text/n3",
        reference: "[w3c][eric_prudhommeaux]",
      },
      {
        name: "parameters",
        template: "text/parameters",
        reference: "[rfc7826]",
      },
      {
        name: "parityfec",
        template: "text/parityfec",
        reference: "[rfc3009]",
      },
      {
        name: "plain",
        template: "",
        reference: "[rfc2046][rfc3676][rfc5147]",
      },
      {
        name: "provenance-notation",
        template: "text/provenance-notation",
        reference: "[w3c][ivan_herman]",
      },
      {
        name: "prs.fallenstein.rst",
        template: "text/prs.fallenstein.rst",
        reference: "[benja_fallenstein]",
      },
      {
        name: "prs.lines.tag",
        template: "text/prs.lines.tag",
        reference: "[john_lines]",
      },
      {
        name: "prs.prop.logic",
        template: "text/prs.prop.logic",
        reference: "[hans-dieter_a._hiep]",
      },
      {
        name: "raptorfec",
        template: "text/raptorfec",
        reference: "[rfc6682]",
      },
      {
        name: "red",
        template: "text/red",
        reference: "[rfc4102]",
      },
      {
        name: "rfc822-headers",
        template: "text/rfc822-headers",
        reference: "[rfc6522]",
      },
      {
        name: "richtext",
        template: "",
        reference: "[rfc2045][rfc2046]",
      },
      {
        name: "rtf",
        template: "text/rtf",
        reference: "[paul_lindner]",
      },
      {
        name: "rtp-enc-aescm128",
        template: "text/rtp-enc-aescm128",
        reference: "[_3gpp]",
      },
      {
        name: "rtploopback",
        template: "text/rtploopback",
        reference: "[rfc6849]",
      },
      {
        name: "rtx",
        template: "text/rtx",
        reference: "[rfc4588]",
      },
      {
        name: "sgml",
        template: "text/sgml",
        reference: "[rfc1874]",
      },
      {
        name: "shaclc",
        template: "text/shaclc",
        reference: "[w3c_shacl_community_group][vladimir_alexiev]",
      },
      {
        name: "shex",
        template: "text/shex",
        reference: "[w3c][eric_prudhommeaux]",
      },
      {
        name: "spdx",
        template: "text/spdx",
        reference: "[linux_foundation][rose_judge]",
      },
      {
        name: "strings",
        template: "text/strings",
        reference: "[ieee-isto-pwg-ppp]",
      },
      {
        name: "t140",
        template: "text/t140",
        reference: "[rfc4103]",
      },
      {
        name: "tab-separated-values",
        template: "text/tab-separated-values",
        reference: "[paul_lindner]",
      },
      {
        name: "troff",
        template: "text/troff",
        reference: "[rfc4263]",
      },
      {
        name: "turtle",
        template: "text/turtle",
        reference: "[w3c][eric_prudhommeaux]",
      },
      {
        name: "ulpfec",
        template: "text/ulpfec",
        reference: "[rfc5109]",
      },
      {
        name: "uri-list",
        template: "text/uri-list",
        reference: "[rfc2483]",
      },
      {
        name: "vcard",
        template: "text/vcard",
        reference: "[rfc6350]",
      },
      {
        name: "vnd.a",
        template: "text/vnd.a",
        reference: "[regis_dehoux]",
      },
      {
        name: "vnd.abc",
        template: "text/vnd.abc",
        reference: "[steve_allen]",
      },
      {
        name: "vnd.ascii-art",
        template: "text/vnd.ascii-art",
        reference: "[kim_scarborough]",
      },
      {
        name: "vnd.curl",
        template: "text/vnd.curl",
        reference: "[robert_byrnes]",
      },
      {
        name: "vnd.debian.copyright",
        template: "text/vnd.debian.copyright",
        reference: "[charles_plessy]",
      },
      {
        name: "vnd.dmclientscript",
        template: "text/vnd.dmclientscript",
        reference: "[dan_bradley]",
      },
      {
        name: "vnd.dvb.subtitle",
        template: "text/vnd.dvb.subtitle",
        reference: "[peter_siebert][michael_lagally]",
      },
      {
        name: "vnd.esmertec.theme-descriptor",
        template: "text/vnd.esmertec.theme-descriptor",
        reference: "[stefan_eilemann]",
      },
      {
        name: "vnd.exchangeable",
        template: "text/vnd.exchangeable",
        reference: "[martin_cizek]",
      },
      {
        name: "vnd.familysearch.gedcom",
        template: "text/vnd.familysearch.gedcom",
        reference: "[gordon_clarke]",
      },
      {
        name: "vnd.ficlab.flt",
        template: "text/vnd.ficlab.flt",
        reference: "[steve_gilberd]",
      },
      {
        name: "vnd.fly",
        template: "text/vnd.fly",
        reference: "[john-mark_gurney]",
      },
      {
        name: "vnd.fmi.flexstor",
        template: "text/vnd.fmi.flexstor",
        reference: "[kari_e._hurtta]",
      },
      {
        name: "vnd.gml",
        template: "text/vnd.gml",
        reference: "[mi_tar]",
      },
      {
        name: "vnd.graphviz",
        template: "text/vnd.graphviz",
        reference: "[john_ellson]",
      },
      {
        name: "vnd.hans",
        template: "text/vnd.hans",
        reference: "[hill_hanxv]",
      },
      {
        name: "vnd.hgl",
        template: "text/vnd.hgl",
        reference: "[heungsub_lee]",
      },
      {
        name: "vnd.in3d.3dml",
        template: "text/vnd.in3d.3dml",
        reference: "[michael_powers]",
      },
      {
        name: "vnd.in3d.spot",
        template: "text/vnd.in3d.spot",
        reference: "[michael_powers]",
      },
      {
        name: "vnd.iptc.newsml",
        template: "text/vnd.iptc.newsml",
        reference: "[iptc]",
      },
      {
        name: "vnd.iptc.nitf",
        template: "text/vnd.iptc.nitf",
        reference: "[iptc]",
      },
      {
        name: "vnd.latex-z",
        template: "text/vnd.latex-z",
        reference: "[mikusiak_lubos]",
      },
      {
        name: "vnd.motorola.reflex",
        template: "text/vnd.motorola.reflex",
        reference: "[mark_patton]",
      },
      {
        name: "vnd.ms-mediapackage",
        template: "text/vnd.ms-mediapackage",
        reference: "[jan_nelson]",
      },
      {
        name: "vnd.net2phone.commcenter.command",
        template: "text/vnd.net2phone.commcenter.command",
        reference: "[feiyu_xie]",
      },
      {
        name: "vnd.radisys.msml-basic-layout",
        template: "text/vnd.radisys.msml-basic-layout",
        reference: "[rfc5707]",
      },
      {
        name: "vnd.senx.warpscript",
        template: "text/vnd.senx.warpscript",
        reference: "[pierre_papin]",
      },
      {
        name: "vnd.si.uricatalogue (obsoleted by request)",
        template: "text/vnd.si.uricatalogue",
        reference: "[nicholas_parks_young]",
      },
      {
        name: "vnd.sun.j2me.app-descriptor",
        template: "text/vnd.sun.j2me.app-descriptor",
        reference: "[gary_adams]",
      },
      {
        name: "vnd.sosi",
        template: "text/vnd.sosi",
        reference: "[petter_reinholdtsen]",
      },
      {
        name: "vnd.trolltech.linguist",
        template: "text/vnd.trolltech.linguist",
        reference: "[david_lee_lambert]",
      },
      {
        name: "vnd.wap.si",
        template: "text/vnd.wap.si",
        reference: "[wap-forum]",
      },
      {
        name: "vnd.wap.sl",
        template: "text/vnd.wap.sl",
        reference: "[wap-forum]",
      },
      {
        name: "vnd.wap.wml",
        template: "text/vnd.wap.wml",
        reference: "[peter_stark]",
      },
      {
        name: "vnd.wap.wmlscript",
        template: "text/vnd.wap.wmlscript",
        reference: "[peter_stark]",
      },
      {
        name: "vtt",
        template: "text/vtt",
        reference: "[w3c][silvia_pfeiffer]",
      },
      {
        name: "wgsl",
        template: "text/wgsl",
        reference: "[w3c][david_neto]",
      },
      {
        name: "xml",
        template: "text/xml",
        reference: "[rfc7303]",
      },
      {
        name: "xml-external-parsed-entity",
        template: "text/xml-external-parsed-entity",
        reference: "[rfc7303]",
      },
    ],
  },
  media: {
    image: [
      {
        name: "aces",
        template: "image/aces",
        reference: "[smpte][howard_lukk]",
      },
      {
        name: "apng",
        template: "image/apng",
        reference: "[w3c][w3c_png_working_group]",
      },
    ],
    audio: [
      {
        name: "32kadpcm",
        template: "audio/32kadpcm",
        reference: "[rfc3802][rfc2421]",
      },
      {
        name: "3gpp",
        template: "audio/3gpp",
        reference: "[rfc3839][rfc6381]",
      },
    ],
  },
};
export default MIMETypes;
