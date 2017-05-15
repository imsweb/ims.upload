from setuptools import setup, find_packages

version = '2.1.1'

setup(name='ims.upload',
      version=version,
      description="Plone package for chunked uploads",
      classifiers=[
          "Framework :: Plone",
          "Programming Language :: Python",
      ],
      keywords='',
      author='Eric Wohnlich',
      author_email='wohnlice@imsweb.com',
      url='http://git.imsweb.com/plone/ims.upload',
      license='MIT',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['ims'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          'collective.js.jqueryui>=1.10.1.2',
          'plone.app.dexterity',
      ],
      entry_points="""
      # -*- Entry points: -*-

      [z3c.autoinclude.plugin]
      target = plone
      """,
      )
